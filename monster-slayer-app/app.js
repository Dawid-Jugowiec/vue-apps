function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data: function () {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      chargedAttack: true,
      chargingCounter: 0,
      winner: null,
      roundNumber: 0,
      logMessages: [],
    };
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
        console.log(this.winner);
      } else if (value <= 0) {
        this.winner = 'player';
        console.log(this.winner);
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
        console.log(this.winner);
      } else if (value <= 0) {
        this.winner = 'monster';
        console.log(this.winner);
      }
    },
  },
  computed: {
    monsterStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.monsterHealth + '%' };
      }
    },
    playerStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.playerHealth + '%' };
      }
    },
    isChargedAttack() {
      return !this.chargedAttack;
    },
  },
  methods: {
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.chargedAttack = true;
      this.chargingCounter = 0;
      this.winner = null;
      this.roundNumber = 0;
      this.logMessages = [];
    },
    attackMonster() {
      const damageReceived = generateRandomNumber(5, 12);
      this.monsterHealth -= damageReceived;
      this.addLogMessage('player', 'attack', damageReceived);
      this.attackPlayer();
      this.chargingAbility();
      this.roundNumber++;
    },
    specialAttackMonster() {
      const damageReceived = generateRandomNumber(10, 20);
      this.monsterHealth -= damageReceived;
      this.addLogMessage('player', 'attack', damageReceived);
      this.attackPlayer();
      this.chargedAttack = false;
      this.roundNumber++;
    },
    attackPlayer() {
      const damageReceived = generateRandomNumber(8, 15);
      this.playerHealth -= damageReceived;
      this.addLogMessage('monster', 'attack', damageReceived);
    },
    healPlayer() {
      const healthReplenished = generateRandomNumber(15, 25);
      if (this.playerHealth + healthReplenished > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healthReplenished;
      }
      this.addLogMessage('player', 'heal', healthReplenished);
      this.attackPlayer();
      this.chargingAbility();
      this.roundNumber++;
    },
    chargingAbility() {
      if (this.chargedAttack == false && this.chargingCounter < 2) {
        this.chargingCounter++;
      } else if (this.chargingCounter >= 2) {
        this.chargingCounter = 0;
        this.chargedAttack = true;
      }
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount('#game');
