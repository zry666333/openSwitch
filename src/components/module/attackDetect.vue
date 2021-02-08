<template>
  <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <Detail title="域名服务器" :type="type1" number="251145" :data="data1" :items="items1"></Detail>
        </el-col>
        <el-col :span="8">
          <Detail title="分布式存储" :type="type2" number="58652" :data="data2" :items="items2"></Detail>
        </el-col>
        <el-col :span="8">
          <Detail title="Web服务器" :type="type3"  number="104921" :data="data3"  :items="items3"></Detail>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Detail from './attackDetect/Detail'

export default {
  name: 'attackDetect',
  components: {
    Detail
  },
  data () {
    return {
      type1: ['DNS劫持', '域名劫持', '缓存投毒', 'DNS放大攻击', 'DDoS攻击', '恶意文件攻击'],
      type2: ['登录用户爆破', '木马植入', '跨站请求伪造', '信息泄露', '弱口令', '恶意启用socket代理'],
      type3: ['xss注入攻击', 'SQL注入攻击', '目录遍历攻击', 'union注入', 'select from过滤', '恶意小程序'],
      data1: [80, 47, 145, 236, 130, 229],
      data2: [120, 67, 215, 136, 230, 29],
      data3: [230, 187, 75, 136, 110, 229],
      items1: [
        {
          trade: '1.0.9.65',
          price: '域名劫持',
          riseFall: 'asdasdf07395656',
          volume: '亚洲'
        },
        {
          trade: '6.0.9.12',
          price: '恶意文件攻击',
          riseFall: 'rtyu07395646',
          volume: '亚洲'
        },
        {
          trade: '152.0.9.45',
          price: 'DDoS攻击',
          riseFall: 'uhgroi0346953456',
          volume: '英国'
        },
        {
          trade: '124.0.9.65',
          price: '恶意文件攻击',
          riseFall: 'ttrtuyt5867567',
          volume: '日本'
        },
        {
          trade: '16.0.9.15',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '15.0.9.65',
          price: '恶意文件攻击',
          riseFall: 'mghdf07395656',
          volume: '英国'
        },
        {
          trade: '16.4.9.66',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '126.0.9.65',
          price: '恶意文件攻击',
          riseFall: 'mnb077654',
          volume: '亚洲'
        }
      ],
      items2: [
        {
          trade: '56.0.9.62',
          price: '木马植入',
          riseFall: 'uhgroi07395656',
          volume: '英国'
        },
        {
          trade: '54.0.9.65',
          price: '恶意启用socket代理',
          riseFall: 'mnbvc4394584',
          volume: '亚洲'
        },
        {
          trade: '16.0.9.65',
          price: '恶意文件攻击',
          riseFall: 'nkdtyt675364',
          volume: '亚洲'
        },
        {
          trade: '15.3.9.65',
          price: '木马植入',
          riseFall: 'zerdf07sdfa56',
          volume: '亚洲'
        },
        {
          trade: '56.0.9.75',
          price: '恶意文件攻击',
          riseFall: 'uherw07395656',
          volume: '亚洲'
        },
        {
          trade: '163.7.49.3',
          price: '木马植入',
          riseFall: 'ertert07395656',
          volume: '日本'
        },
        {
          trade: '16.0.95.6',
          price: '恶意文件攻击',
          riseFall: 'nvbvd073sdf656',
          volume: '亚洲'
        },
        {
          trade: '46.54.67.34',
          price: '恶意文件攻击',
          riseFall: 'erwev07395656',
          volume: '亚洲'
        }
      ],
      items3: [
        {
          trade: '12.1.6.65',
          price: 'union注入',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '16.3.9.65',
          price: 'union注入',
          riseFall: 'uhgroi07395656',
          volume: '英国'
        },
        {
          trade: '54.1.2.65',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '3.3.9.62',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '166.4.95.65',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '12.0.9.65',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '亚洲'
        },
        {
          trade: '132.0.9.45',
          price: '恶意文件攻击',
          riseFall: 'uhgroi07395656',
          volume: '韩国'
        },
        {
          trade: '16.0.59.65',
          price: 'xss注入攻击',
          riseFall: 'kbhjn07395656',
          volume: '日本'
        }
      ]
    }
  }
}
</script>
