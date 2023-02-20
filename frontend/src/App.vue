<template>
  <div>
    <button class="uk-button" @click="sendPayout">Запрос выплаты</button>
    
    <button class="uk-button"  @click="sendStatus">Статус выплаты</button>
    
    <button class="uk-button"  @click="sendBallance">Проверить балланс</button>
  </div>

  <div>
    <p>Результат:</p>
    
    <span v-if="isPreloaderVisible" uk-spinner></span>
    
    <span v-else>{{ message }}</span>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      isPreloaderVisible: false,
      message: '',
      requestString: '',
    }
  },
  methods: {
    sendPayout() {
      this.requestString = "/one-payment/payout"
      this.isPreloaderVisible = true;
      axios
        .get(this.requestString)
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    sendStatus() {
      this.requestString = '/one-payment/status'
      this.isPreloaderVisible = true;
      axios
        .get(this.requestString)
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    sendBallance() {
      this.requestString = '/one-payment/balance'
      this.isPreloaderVisible = true;
      axios
        .get(this.requestString)
        .then(this.parseResponse)
        .finally(() => (this.isPreloaderVisible = false));
    },
    parseResponse(response: any) {
      this.message = response.data;
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
