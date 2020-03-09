import test from 'ava';
import { renderToString } from 'solid-js/dom';
import { Board } from '.';

test('Board component', async t => {
    const tree = await renderToString(() => <Board />, {});
    t.snapshot(tree);
});
