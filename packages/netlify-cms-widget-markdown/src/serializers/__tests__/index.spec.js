import path from 'path';
import fs from 'fs';
import { markdownToSlate } from '../';

describe('markdownToSlate', () => {
  it('should not add duplicate identical marks under the same node (GitHub Issue 3280)', () => {
    const mdast = fs.readFileSync(
      path.join(__dirname, '__fixtures__', 'duplicate_marks_github_issue_3280.md'),
    );
    const slate = markdownToSlate(mdast);

    expect(slate).toEqual({
      object: 'block',
      type: 'root',
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              text: 'Fill to',
            },
            {
              object: 'text',
              text:
                'this_mark, and your charge is but a penny; tothisa penny more; and so on to the full glass—the Cape Horn measure, which you may gulp down for a shilling.\\n\\nUpon entering the place I found a number of young seamen gathered about a table, examining by a dim light divers specimens ofskrimshander',
              marks: [
                {
                  type: 'italic',
                },
              ],
            },
            {
              object: 'text',
              text: '.',
            },
          ],
        },
      ],
    });
  });
});
