<template>
  <main id="app">
    <h1 class="main-heading">Прогноз продвижения</h1>
    <p class="description">
      Мы&nbsp;пользуемся только официальными инструментами рекламы, 
      рекомендуемыми самим YouTube, поэтому все приведенные нами просмотры, 
      лайки и&nbsp;комментарии будут настоящими, а&nbsp;подписчики живыми 
      и&nbsp;заинтересованными в&nbsp;тематике Вашего канала
    </p>
    <Card :amount="views" :text="'просмотр'" class="views-card"/>
    <Card :amount="subscribers" :text="'подписчик'" class="subscribers-card"/>
    <Form class="main-form" :onInput="inputHandler" :money="money" />
    <p class="remark">
      Прогноз подписчиков зависит от&nbsp;Вашего контента. 
      Сделайте его интересным и&nbsp;старайтесь не&nbsp;снижать планку
    </p>
    <div class="graph-wrapper">
      <h2 class="graph-heading">Подписчики</h2>
      <Chart class="graph" :chart-data="chartData" />
    </div>
  </main>
</template>

<script>
import Card from './components/Card.vue';
import Form from './components/Form.vue';
import Chart from './components/Chart.vue';

export default {
  name: 'App',
  components: {
    Card, 
    Form,
    Chart
  },
  data() {
    return {
      money: 10000,
      chartData: {},
    }
  },
  computed: {
    multiplier() {
      return this.money / 7;
    },
    views() {
      return Math.floor(this.multiplier * 0.05 * Math.pow(6, 2) + this.multiplier * 0.0048 * 6);
    },
    subscribers() {
      return this.countSubscribers(6);
    },
  },
  methods: {
    inputHandler(amount) {
      this.money = +amount;
      this.createChart();
    },
    makeGradient() {
      const canv = document.querySelector('#line-chart');
      const ctx = canv.getContext('2d');
      const bg = ctx.createLinearGradient(canv.width * 0.95, canv.height * 0.7, canv.width * 0.9, 0);
      bg.addColorStop(0, 'rgba(142, 86, 233, 0)');
      bg.addColorStop(0.5106, 'rgba(142, 86, 233, 0.31)');
      return bg;
    },
    countSubscribers(x) {
      return Math.floor(this.multiplier * 0.00045 * Math.pow(x, 5) - 
        this.multiplier * 0.00534 * Math.pow(x, 4) + this.multiplier * 0.01762 * Math.pow(x, 3) - 
        this.multiplier * 0.00444 * Math.pow(x, 2) - this.multiplier * 0.00318 * x + 1.0996);
    },
    createChart() {
      this.chartData = {
        labels: ['1 день', '2 день', '3 день', '4 день', '5 день', '6 день', '7 день'],
        datasets: [
          {
            borderColor: '#7045C4',
            backgroundColor: this.makeGradient(),
            pointBackgroundColor: '#fff',
            pointBorderColor: '#7045C4',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverBackgroundColor: '#7045C4',
            data: this.createData()
          }
        ],
      }
    },
    createData() {
      const data = [];
      for (let i = 0; i < 7; i++) {
        data.push(this.countSubscribers(i));
      };
      return data;
    }
  },
  mounted() {
    this.createChart();
    this.createData();
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=PT+Sans:wght@400;700&display=swap');
@import './assets/styles/variables.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1440px;
  margin: 0 auto;
  padding-top: 100px;
  display: grid;
  grid-template-columns: 590px 1fr 240px 240px;
  grid-template-rows: minmax(64px, auto) minmax(104px, auto) 209px minmax(44px, auto);
  grid-column-gap: 24px;
  grid-row-gap: 30px;
  grid-template-areas: 
    'heading heading heading heading'
    'description . views subscribers'
    'form graph graph graph'
    'remark graph graph graph';

  @media (max-width: 1439px) {
    & {
      width: 100%;
      padding: 80px 40px 50px 40px;
      padding-left: 40px;
      padding-right: 40px;
      grid-template-columns: minmax(502px, auto) minmax(348px, auto);
      grid-template-rows: minmax(50px, auto) minmax(78px, auto) repeat(2, 92px) 283px minmax(44px, auto);
      grid-gap: 22px;
      grid-column-gap: 30px;
      justify-content: center;
      justify-items: center;
      grid-template-areas: 
        'heading heading'
        'description description'
        'form views'
        'form subscribers'
        'graph graph'
        'remark .';
    }
  }

  @media (max-width: 959px) {
    & {
      width: 100vw;
      padding: 50px 0;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: minmax(42px, auto) auto auto 92px 228px auto;
      grid-gap: 16px;
      grid-template-areas: 
        'heading heading'
        'description description'
        'form form'
        'views subscribers'
        'graph graph'
        'remark remark';
    }
  }
}

.main-heading {
  grid-area: heading;
  margin-bottom: 31px;
  font-family: $pt;
  font-size: 46px;
  font-weight: 700;
  line-height: 64px;
  letter-spacing: .01em;
  text-align: center;
  color: $primaryText;

  @media (max-width: 1439px) {
    & {
      margin-bottom: 0;
      font-size: 38px;
      line-height: 50px;
    }
  }

  @media (max-width: 959px) {
    & {
      margin-bottom: 3px;
      font-size: 32px;
      line-height: 42px;
      letter-spacing: .02em;
    }
  }
}

.description {
  grid-area: description;
  margin-bottom: 17px;
  font-family: $mont;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: $text;

  @media (max-width: 1439px) {
    & {
      text-align: center;
      margin-bottom: 6px;
    }
  }

  @media (max-width: 959px) {
    & {
      margin-bottom: 15px;
      font-size: 15px;
      line-height: 25px;
      padding: 0 20px;
    }
  }
}

.views-card {
  grid-area: views;

  @media (max-width: 959px) {
    & {
      justify-self: end;
    }
  }
}

.subscribers-card {
  grid-area: subscribers;

  @media (max-width: 959px) {
    & {
      justify-self: start;
    }
  }
}

.main-form {
  grid-area: form;
}

.remark {
  grid-area: remark;
  width: 100%;
  font-family: $mont;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: .02em;
  color: $fadedText;

  @media (max-width: 1439px) {
    & {
      margin-top: 16px;
      padding-right: 10px;
    }
  }

  @media (max-width: 959px) {
    & {
      margin-top: 15px;
      padding: 0 19px;
      font-size: 14px;
      line-height: 20px;
    }
  }
}

.graph-wrapper {
  grid-area: graph;
  justify-self: end;
  width: 701px;
  height: 283px;
  border-radius: 6px;
  border: 1px solid #e2e5ee;
  padding-bottom: 15px;

  @media (max-width: 1439px) {
    & {
      padding: 0 40px 15px 40px;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      margin-top: 8px;
    }
  }

  @media (max-width: 959px) {
    & {
      padding: 0;
      border-radius: 0;
      height: 228px;
      margin-top: 0;
    }
  }

  .graph-heading {
    visibility: hidden;
    font-family: $pt;
    font-size: 15px;
    line-height: 18px;
    margin-left: 20px;
    margin-top: 5px;

    @media (max-width: 959px) {
      & {
        visibility: visible;
        margin-top: 15px;
      }
    }
  }

  .graph {
    height: 100%;
  }
}
</style>
