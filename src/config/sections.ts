/* THE PAGE ORDER. One line = one section file in src/sections/.
   - Reorder: move a line.
   - Hide: delete or comment out the line (file stays).
   - Remove for good: delete the line AND the file.
   - Add: create src/sections/MySection.astro, then add a line here.
   `nav` = label shown in the top navigation (leave out to keep it out of the menu). */
export type Section = { file: string; id: string; nav?: string }

export const sections: Section[] = [
  { file: 'Hero', id: 'top' },
  { file: 'Work', id: 'work', nav: 'Work' },
  { file: 'About', id: 'about', nav: 'About' },
  { file: 'Journey', id: 'journey', nav: 'Journey' },
  { file: 'Skills', id: 'skills', nav: 'Toolbox' },
  // { file: 'Milestones', id: 'milestones', nav: 'Milestones' },
  { file: 'Contact', id: 'contact' },
  { file: 'Footer', id: 'footer' },
]
