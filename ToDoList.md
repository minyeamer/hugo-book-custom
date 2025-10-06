# To-Do List

## Main Layout
- [x] Align the menu to the left edge instead of floating in the left side.
- [x] Position the table of contents (ToC) at the right edge with margin.
- [x] Hide the menu when the content overlaps with the menu due to small screen size.
- [x] Hide the ToC when the content overlaps with the ToC due to small screen size.

## Header
- [x] Display the header when either the menu or ToC is hidden.
- [x] Keep the header fixed at the top with a slightly transparent background.
- [x] When the ToC is hidden and the menu is visible, disable only the menu icon in the header.
- [x] ~~Keep the header always visible and disable icons in the header when both menu and ToC are displayed.~~
- [ ] Make the header title link back to the homepage.

## Menu
- [x] Add a profile picture at the top of the menu.
- [x] Add social media icons and a dark mode toggle button below the profile picture.
- [x] Configure social icons to link to URLs provided via configuration parameters.
- [ ] Disable social icons that lack corresponding links.

## Table of Contents
- [x] Change ToC text color to black in light mode and gray in dark mode.
- [x] Add a border on the left side of the ToC matching the text color, except ToC in header.
- [ ] Highlight the current active ToC item.

## Code Block
- [x] Apply dark mode colors to inline code blocks.
- [ ] Add line numbers to code blocks.
- [ ] Style code blocks in a Mac terminal style, including copy functionality.

## Dark Mode
- [x] Add JavaScript to toggle dark mode on/off via the dark mode toggle button.
- [x] Set the default display mode based on the system preference.
- [x] Apply dark mode colors to main layout elements.

## Additional Features
- [x] Add "go to top", "go to bottom", and "go back" buttons at the bottom right.
- [x] Add a scroll progress bar at the top.

## Site Integration
- [ ] Add homepage and search pages (or style search area in the menu).
- [ ] Add category pages (or style category area in the menu).
- [ ] Show the 5 most recent posts in the menu.
- [ ] Add navigation buttons at the bottom of current article to move between articles by created time.
- [ ] Integrate comment functionality (Utterances)
- [ ] Add tags per article and tag index pages.
- [ ] Add social sharing buttons at the bottom of current article.
- [ ] Integrate visitor statistics with GA4.