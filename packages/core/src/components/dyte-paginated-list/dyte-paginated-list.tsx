import { Component, Host, h, VNode, State, Prop, writeTask, Method, Watch } from '@stencil/core';
import { debounce } from 'lodash-es';
import { defaultIconPack, IconPack } from '../../lib/icons';
import { DyteI18n, useLanguage } from '../../lib/lang';
import { smoothScrollToBottom } from '../../utils/scroll';
import { DyteUIKitStore } from '../../exports';
import { updateComponentProps } from '../../utils/component-props';

export interface DataNode {
  id: string;
  [key: string]: any;
}

@Component({
  tag: 'dyte-paginated-list',
  styleUrl: 'dyte-paginated-list.css',
  shadow: true,
})
export class DytePaginatedList {
  private componentPropsCleanupFn: () => void = () => {};
  private intersectionObserver: IntersectionObserver;

  private $paginatedList: HTMLDivElement;

  private $topRef: HTMLDivElement;

  private $bottomRef: HTMLDivElement;

  /** Page Size */
  @Prop() pageSize: number;

  /**
   * Number of pages allowed to be shown
   */
  @Prop() pagesAllowed: number;

  /** Fetch the data */
  @Prop() fetchData: (timestamp: number, size: number, reversed: boolean) => Promise<unknown[]>;

  /** Create nodes */
  @Prop() createNodes: (data: unknown[]) => VNode[];

  /** Item id */
  @Prop() selectedItemId?: string;

  /** auto scroll list to bottom */
  @Prop() autoScroll = true;

  /** Icon pack */
  @Prop() iconPack: IconPack = defaultIconPack;

  /** Language */
  @Prop() t: DyteI18n = useLanguage();

  /** label to show when empty */
  @Prop() emptyListLabel: string = null;

  @State() isLoading: boolean = false;

  @State() rerenderBoolean: boolean = false;

  /**
   * This gets disabled when the user scrolls up and the bottom node
   * is not visible anymore.
   */
  @State() shouldRenderNewNodes: boolean = true;

  /**
   * This gets disabled when the user scrolls up and the bottom node
   * is not visible anymore.
   */
  @State() hasNewNodesToRender: boolean = false;

  @State() showEmptyListLabel = false;

  /**
   * This is a private variable not a state
   * since we want to debounce rerenders
   *
   * A list of pages where each page contains a number of Nodes
   * [
   *  [Node 1, Node 2, Node 3.... Node N],
   *  [Node 1, Node 2, Node 3.... Node N],
   * ]
   */
  private pagesToRender: DataNode[][] = [[]];

  /**
   * On a new node created
   */
  @Method()
  async onNewNode(node: DataNode) {
    if (!this.shouldRenderNewNodes) {
      this.hasNewNodesToRender = true;
      return;
    }
    this.addNodeToRender(node, false);
    this.rerender();
  }

  /**
   * On node deleted
   */
  @Method()
  async onNodeDelete(key: string) {
    const oldLength = this.pagesToRender.flat().length;
    this.pagesToRender = this.pagesToRender.map((page) => page.filter((item) => item.id !== key));
    if (oldLength !== this.pagesToRender.flat().length) {
      this.rerender();
    }
  }

  /**
   * On node updated
   */
  @Method()
  async onNodeUpdate(key: string, newItem: DataNode) {
    let shouldRerender = false;

    this.pagesToRender = this.pagesToRender.map((page) =>
      page.map((item) => {
        if (item.id === key) {
          shouldRerender = true;
          return newItem;
        }
        return item;
      })
    );
    if (shouldRerender) this.rerender();
  }

  @Watch('selectedItemId')
  onItemChanged(newItemId: string, oldItemId: string) {
    if (newItemId !== oldItemId) {
      this.pagesToRender = [[]];
      this.loadFirstPage().then(() => this.rerender());
    }
  }

  connectedCallback() {
    this.rerender = debounce(this.rerender.bind(this), 50, { maxWait: 200 });
    this.intersectionObserver = new IntersectionObserver((entries) => {
      writeTask(() => {
        for (const entry of entries) {
          if (entry.target.id === 'bottom-scroll') {
            if (entry.isIntersecting) this.loadBottom();
            else this.shouldRenderNewNodes = false;
          }
          if (entry.target.id === 'top-scroll' && entry.isIntersecting) {
            this.loadTop();
          }
        }
      });
    });
    this.componentPropsCleanupFn = DyteUIKitStore.onChange(
      'componentProps',
      updateComponentProps.bind(this)
    );
  }

  disconnectedCallback() {
    this.intersectionObserver.disconnect();

    this.componentPropsCleanupFn();
  }

  componentDidLoad() {
    /**
     * Adding observes here so that on the first render we scroll down
     * and shouldRenderNewNodes remains true
     */
    this.loadFirstPage();
    this.observe(this.$topRef);
    this.observe(this.$bottomRef);
  }

  componentDidRender() {
    if (this.shouldRenderNewNodes && this.autoScroll) smoothScrollToBottom(this.$paginatedList);
  }

  private currentTime = () => {
    return new Date().getTime();
  };

  private observe = (el: HTMLElement) => {
    if (!el) return;
    this.intersectionObserver.observe(el);
  };

  private loadFirstPage() {
    return this.loadPage(this.currentTime(), this.pageSize, true, (data) => {
      if (data.length === 0) {
        this.showEmptyListLabel = true;
      }
    });
  }

  private loadTop() {
    /**
     * If there is only one unfilled page or no page, no need to check
     * for top since it will be empty
     */
    if (this.pagesToRender.length === 0) return;
    if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize) return;
    /**
     * TODO: Make this more flexible currently this only works with chat
     */
    const oldestVNode = this.pagesToRender[0][0];
    const oldestTimestamp = oldestVNode.timeMs;

    // TODO: scrollIntoView
    const onPageRendered = () => {}; // oldestVNode.$elm$?.scrollIntoView();
    this.loadPage(oldestTimestamp - 1, this.pageSize, true, onPageRendered);
  }

  private loadBottom() {
    /**
     * If there is only one unfilled page or no page, no need to check
     * for top since it will be empty
     */
    if (this.pagesToRender.length === 0) {
      this.shouldRenderNewNodes = true;
      return;
    }
    if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize) {
      this.shouldRenderNewNodes = true;
      return;
    }

    const newestVNode = this.pagesToRender.at(-1).at(-1);
    const newestTimestamp = newestVNode.timeMs;

    // TODO: scrollIntoView
    const onPageRendered = () => smoothScrollToBottom(this.$paginatedList);
    this.loadPage(newestTimestamp + 1, this.pageSize, false, onPageRendered);
  }

  private addNodeToRender(node: DataNode, addToStart: boolean) {
    if (addToStart) {
      const firstPage = this.pagesToRender[0];
      if (firstPage && firstPage?.length < this.pageSize) {
        /**
         * If first page is not full then just add to that page
         */
        firstPage.unshift(node);
      } else {
        /**
         * If first page is full then add a new page to the start
         */
        const newPage = [node];
        this.pagesToRender.unshift(newPage);
        this.removeLastPageIfNeeded(false);
      }
    } else {
      const [lastPage] = this.pagesToRender.slice(-1);
      if (lastPage && lastPage?.length < this.pageSize) {
        /**
         * If last page is not full then just add it
         */
        lastPage.push(node);
      } else {
        /**
         * If last page is full add a new page with just
         * this node
         */
        const newPage = [node];
        this.pagesToRender.push(newPage);

        this.removeLastPageIfNeeded(true);
      }
    }
  }

  /**
   * @param start
   * @param end
   * @param reversed Defines whether to add the page at the beginning or the end
   * @param onPageLoaded Callback for when all new nodes are rendered
   */
  private async loadPage(
    timestamp: number,
    size: number,
    reversed: boolean,
    onPageRendered: (data: DataNode[]) => void = () => {}
  ) {
    this.isLoading = true;
    const data = (await this.fetchData(timestamp, size, reversed)) as DataNode[];
    this.isLoading = false;
    if (!data?.length) {
      /**
       * While scrolling down if there were no new items found
       * then start rendering new nodes;
       */
      if (!reversed) {
        this.hasNewNodesToRender = false;
        this.shouldRenderNewNodes = true;
      }
      onPageRendered([]);
      return;
    }
    // const page = this.createNodes(data);

    // const lastNodeToBeRendered = page[page.length - 1];
    // let lastNodeToBeRenderedProxy = new Proxy(lastNodeToBeRendered, {
    //   set(obj, prop, value) {
    //     /**
    //      * Whenever the last node has the 'elm' property added to it
    //      * we can assume it has been rendered
    //      */
    //     if (prop === '$elm$' && value && !obj.$elm$) onPageRendered();
    //     obj[prop] = value;
    //     return true;
    //   },
    // });
    // page[page.length - 1] = lastNodeToBeRenderedProxy;

    data.forEach((node) => this.addNodeToRender(node, reversed));
    this.rerender();
    onPageRendered(data);
  }

  private rerender() {
    this.rerenderBoolean = !this.rerenderBoolean;
  }

  private removeLastPageIfNeeded(removeFromStart: boolean) {
    if (this.pagesToRender.length > this.pagesAllowed) {
      if (removeFromStart) this.pagesToRender.shift();
      else this.pagesToRender.pop();
    }
  }

  private onDownArrowClicked() {
    /**
     * Load the freshest pages
     */
    this.loadBottom();
  }

  render() {
    /**
     * div.container is flex=column-reverse
     * which is why div#bottom-scroll comes before div#top-scroll
     * div.page-wrapper prevents reversal of messages
     */
    return (
      <Host>
        <div class="scrollbar container" part="container" ref={(el) => (this.$paginatedList = el)}>
          <div class={{ 'show-new-messages-ctr': true, active: !this.shouldRenderNewNodes }}>
            <dyte-button
              class="show-new-messages"
              kind="icon"
              variant="secondary"
              part="show-new-messages"
              onClick={() => this.onDownArrowClicked()}
              iconPack={this.iconPack}
              t={this.t}
            >
              <dyte-icon icon={this.iconPack.chevron_down} iconPack={this.iconPack} t={this.t} />
            </dyte-button>
          </div>
          <div
            class="smallest-dom-element"
            id="bottom-scroll"
            ref={(el) => (this.$bottomRef = el)}
          ></div>
          {this.isLoading && this.pagesToRender.flat().length === 0 && <dyte-spinner size="lg" />}
          {this.pagesToRender.flat().length === 0 && this.showEmptyListLabel ? (
            <div class="empty-list">{this.emptyListLabel ?? this.t('list.empty')}</div>
          ) : (
            <div class="page-wrapper">
              {this.pagesToRender.map((page) => this.createNodes(page))}
            </div>
          )}
          <div class="smallest-dom-element" id="top-scroll" ref={(el) => (this.$topRef = el)}></div>
        </div>
      </Host>
    );
  }
}
