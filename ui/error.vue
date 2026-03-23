<template>
  <NuxtLayout>
    <div id="error">
      <div class="error" v-if="error?.statusCode === 404">
        <div class="error-code">
          <h3>Oops! Something Wrong</h3>
          <h1><span>4</span><span>0</span><span>4</span></h1>
        </div>
        <h2>sorry, the page was not found</h2>
        <p>Go back to <nuxt-link to="/">HOME.</nuxt-link></p>
      </div>
      <div class="error" v-else-if="error?.statusCode === 401">
        <div class="error-code">
          <h3>Oops! Something Wrong</h3>
          <h1><span>D</span><span>A</span><span>N</span><span>G</span></h1>
        </div>
        <h2>{{ error?.message }}</h2>
        <p>Go to <nuxt-link to="/signin">SIGNIN.</nuxt-link></p>
      </div>
      <div class="error" v-else-if="error">
        <div class="error-code">
          <h3>Oops! Something Wrong</h3>
          <h1><span>D</span><span>A</span><span>N</span><span>G</span></h1>
        </div>
        <h2>{{ error?.message }}</h2>
        <p>Go back to <nuxt-link to="/">HOME.</nuxt-link></p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error: any = useError();
</script>

<style scoped>
#error {
  position: relative;
  height: auto;
  overflow: hidden;
  min-height: calc(100vh - 245px);
}

#error .error {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.error {
  max-width: 520px;
  width: 100%;
  line-height: 1.4;
  text-align: center;
}

.error .error-code {
  position: relative;
  height: 240px;
}

.error .error-code h1 {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 252px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -40px;
  margin-left: -20px;
}

.error .error-code h1 > span {
  text-shadow: -8px 0px 0px #fff;
}

.error .error-code h3 {
  position: relative;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #ffffff;
}

.error h2 {
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  color: #ffffff;
}

.error p {
  color: #ffffff;
  margin-top: 5px;
}
.error p a {
  cursor: pointer;
}

@media only screen and (max-width: 767px) {
  .error .error-code {
    height: 200px;
  }
  .error .error-code h1 {
    font-size: 200px;
  }
}

@media only screen and (max-width: 480px) {
  .error .error-code {
    height: 162px;
  }
  .error .error-code h1 {
    font-size: 162px;
    height: 150px;
    line-height: 162px;
  }
  .error h2 {
    font-size: 16px;
  }
}
</style>
