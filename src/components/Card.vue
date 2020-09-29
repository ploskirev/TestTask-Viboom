<template>
  <div class="card">
    <p>
      <span class="amount">+{{amount | numberFilter}}</span>
      <span class="text">{{text | textFilter(amount)}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['amount', 'text']
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 112px;
  background-color: transparentize($color: $third, $amount: 0.7);
  border-radius: 6px;
  text-align: center;

  @media (max-width: 1439px) {
    & {
      width: 348px;
      height: 100%;
    }
  }

  @media (max-width: 959px) {
    & {
      width: calc(100% - 20px);
      max-width: 300px;
    }
  }

  span {
    display: block;
  }

  .amount {
    font-family: $pt;
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    color: $primaryText;

    @media (max-width: 1439px) {
      & {
        font-size: 26px;
        line-height: 28px;
        letter-spacing: .03em;
      }
    }

    @media (max-width: 959px) {
      & {
        font-size: 21px;
        line-height: 26px;
      }
    }
  }

  .text {
    font-family: $mont;
    font-weight: 500;
    font-size: 18px;
    line-height: 31px;
    color: $secondaryText;

    @media (max-width: 959px) {
      & {
        font-size: 15px;
      }
    }
  }
}
</style>
