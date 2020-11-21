<template>
  <div class="container-card">
    <header class="header-card">
      <label class="label"></label>
    </header>
    <p class="content">Lorem, ipsum dolor.</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container-card {
  cursor: pointer;
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
}

.content {
  font-weight: 500;
  line-height: 20px;
}

.label {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ff0000;
  border-radius: 50%;
  position: absolute;
  top: -14px;
}
</style>
