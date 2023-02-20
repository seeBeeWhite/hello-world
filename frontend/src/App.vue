<template>
  <div>
    <button class="uk-button" @click="sendPayout">Запрос выплаты</button>
    
    <button class="uk-button"  @click="sendStatus">Статус выплаты</button>
    
    <button class="uk-button"  @click="sendBallance">Проверить балланс</button>
  </div>

  <div>
    <p>Результат:</p>
    
    <span v-if="isPreloaderVisible" uk-spinner></span>
    
    <span v-else>{{ responseText }}</span>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      isPreloaderVisible: false,
      responseText: "",
    }
  },
  methods: {
    sendPayout() {
      this.isPreloaderVisible = true;
      
      axios
        .post("/one-payment/payout", {
          account: "79251234567",
          amount: "50",
          description: "Тестовый платеж",
          partner_id: "1234",
          payment_type: "qiwi",
          project_id: "5678",
          sign: "d724e1e6453a43397bb2aa6d6be9cc06",
          user_data: "1",
        })
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    sendStatus() {
      this.isPreloaderVisible = true;
      
      axios
        .post("/one-payment/status", {
          order_id: "5678",
          partner_id: "1234",
          sign: "d724e1e6453a43397bb2aa6d6be9cc06",
          user_data: "1",
        })
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    sendBallance() {
      this.isPreloaderVisible = true;
      
      axios
        .post("/one-payment/balance", {
          partner_id: "1234"
        })
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    parseResponse(response: any) {
      this.responseText = response.data;
    }
  }
}
</script>

<style>
  .uk-button {
    margin: 16px 0;
    min-width: 220px;
    display: block;
  }
  
  
</style>
