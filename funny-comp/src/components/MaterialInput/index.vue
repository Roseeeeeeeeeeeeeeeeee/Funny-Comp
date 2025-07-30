<script setup>

</script>

<template>
    <div class="material-input-container">
        <div class="content">
          <input id="username" required type="text">
            <span class="bar" />
            <label for="username">User Name</label>
        </div>
    </div>
</template>

<style scoped lang="less">
.material-input-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    width: 30em;
    height: 3em;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      line-height: 40px;
      border: none;
      font-size: 16px;
      border-bottom: 1px solid gray;
      outline: none;

      &:focus~.bar {
        width: 100%;
      }
      &:focus~label{
        transform: translateY(-40px);
        font-size: 18px;
        color: #5264ae;
      }
      &:valid~label{
        transform: translateY(-40px);
        font-size: 18px;
        color: #5264ae;
      }
    }

    label {
      position: absolute;
      left: 0;
      bottom: 0;
      transition: .4s ease;
      font-size: 14px;
    }

    .bar {

      left: 50%;
      bottom: -4px;
      transform: translate(-50%,-50%);
      position: absolute;
      background: #5264ae;
      transition: 0.4s ease;
      // width: 100%;
      width: 0%;
      height: 5px;
    }

  }
}
</style>
