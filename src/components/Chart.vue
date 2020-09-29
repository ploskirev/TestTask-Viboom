<script>
import {Line, mixins} from 'vue-chartjs';
const {reactiveProp} = mixins;

export default {
  name: 'Chart',
  extends: Line,
  mixins: [
    reactiveProp
  ],
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            gridLines: {
              lineWidth: 0,
              zeroLineWidth: 2,
              drawTicks: false,
              zeroLineColor: '#E2E5EE',
            },
            ticks: {
              padding: 19,
              fontFamily: "'PT Sans', sans serif",
              fontSize: 13,
              labelOffset: 3,
              maxTicksLimit: 6
            }
          }],
          xAxes: [{
            gridLines: {
              drawBorder: true,
              zeroLineWidth: 2,
              drawTicks: false,
              zeroLineColor: '#E2E5EE',
              borderDash: [3, 3],
            },
            ticks: {
              padding: 15,
              fontFamily: "'PT Sans', sans serif",
              fontSize: 13
            }
          }]
        },
        layout: {
          padding: {
            left: 14,
            right: 35,
            top: 17,
            bottom: 40
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
