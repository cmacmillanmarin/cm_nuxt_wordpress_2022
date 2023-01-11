<template>
  <footer class="footer will-fade" v-intersect:animate.fade>
    <nav class="in-grid in-grid--centered">
      <ul class="in-grid__col-6--desktop">
        <li>
          <a href="https://github.com/cmacmillanmarin" rel="noopener"
            >Nuxt + Headless Wordpress CMS 2022</a
          >
        </li>
      </ul>
      <ul class="footer__copy in-grid__col-6--desktop text-align--right">
        <li><a href="https://cmacmillanmarin.com" rel="noopener">@cmacmillanmarin 2022</a></li>
      </ul>
    </nav>
  </footer>
</template>

<style lang="scss">
.footer {
  margin: 2rem 0;
  &__copy {
    text-align: right;
  }
}
</style>
