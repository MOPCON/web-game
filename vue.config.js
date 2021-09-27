module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
             @import "@/assets/styles/all.scss";
          `,
      },
    },
  },
};
