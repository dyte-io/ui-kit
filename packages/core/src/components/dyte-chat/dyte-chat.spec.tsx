import { newSpecPage } from '@stencil/core/testing';
import { DyteChat } from './dyte-chat';

describe('<dyte-chat>', () => {
  it('should contain a chat-addon slot', async () => {
    // newton-school uses chat-addons
    const page = await newSpecPage({
      components: [DyteChat],
      html: `<dyte-chat><div slot="chat-addon">Chat addons</div></dyte-chat>`,
    });
    expect(page.root).toEqualHtml(`
    <dyte-chat>
      <mock:shadow-root></mock:shadow-root>
      <div slot="chat-addon">
        Chat addons
      </div>
    </dyte-chat>
  `);
  });
});
