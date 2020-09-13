<template>
  <div class="nav-bar">
    <a class="location">{{ location }}</a>
    <router-link to="/">
      <div class="link">
        <img src="../assets/images/fight.png" />
        Adventure
      </div>
    </router-link>
    <router-link to="shop">
      <div class="link">
        <img src="../assets/images/shop.png" />
        Shop
      </div>
    </router-link>
    <router-link to="map">
      <div class="link">
        <img src="../assets/images/map.png" />
        Map
      </div>
    </router-link>
    <router-link to="land">
      <div class="link">
        <img src="../assets/images/land.png" />
        Land
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "NavBar",
  props: {
    location: String
  }
};
</script>

<style scoped lang="scss">
@import "../styles.scss";

a {
  margin-right: 20px;
}

.nav-bar {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 20px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.location {
  margin-right: auto;
  font-size: 32px;
  letter-spacing: 4px;
  text-shadow: -1px 0px 3px #fff;
  color: #fff;
}

.link {
  position: relative;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: pointer;

  color: #fff;
  font-size: 18px;
  transition: 0.1s linear all;
  text-transform: uppercase;
  letter-spacing: 4px;
  opacity: 0.8;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    transition: 0.3s linear all;
    filter: grayscale(100%);
  }

  &:hover {
    opacity: 1;
  }

  &:hover img {
    filter: drop-shadow(0px 0px 12px $primary-blue);
  }
}
</style>
