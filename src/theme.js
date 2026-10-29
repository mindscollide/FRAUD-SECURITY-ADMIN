// antd theme (antd 6 is CSS-in-JS and reads no Less variables). Mirrors FRMU
// main's orange/peach design ("Minds Collide New Screens"); the comment beside
// each token names the Less variable FRMU main sets in vite.config.js.
//
// Palette: primary orange #EC8D57 · peach #F0BA94 · light peach #FFF5EE ·
// hover peach #FCE3D2 · row stripes #FFF8F3 / #FDEEE5 · text #2F2F2F.
const theme = {
  token: {
    colorPrimary: "#EC8D57", // @primary-color
    colorBgLayout: "#FFF5EE", // @body-background
    fontFamily: "'Open Sans', sans-serif", // @font-family
    fontFamilyCode: "'Open Sans', sans-serif", // @code-family
    // inputs, selects, pickers and buttons are rounded to 8px
    borderRadius: 8,
  },
  components: {
    // Sidebar: each parent menu is a rounded card styled in
    // Layout/Sidebar/sidebar.module.css; these tokens keep antd's own
    // defaults in line with it (no inset items, no active bar).
    Menu: {
      itemBg: "#FFFFFF",
      subMenuItemBg: "#FFFFFF",
      itemColor: "#2F2F2F",
      itemHoverColor: "#EC8D57",
      itemHoverBg: "#FFF5EE",
      itemSelectedColor: "#2F2F2F",
      itemSelectedBg: "#F0BA94",
      itemActiveBg: "transparent",
      itemMarginInline: 0,
      itemBorderRadius: 6,
      subMenuItemBorderRadius: 6,
      activeBarBorderWidth: 0,
    },
    Table: {
      headerBg: "#F0BA94",
      headerColor: "#2F2F2F",
      headerSplitColor: "transparent", // no column separators in the header
      headerBorderRadius: 10,
      rowHoverBg: "#FCE3D2", // @table-row-hover-bg
      borderColor: "transparent", // no grid lines
      cellPaddingBlock: 10, // @table-padding-vertical
      cellPaddingInline: 5, // @table-padding-horizontal
    },
  },
};

export default theme;
