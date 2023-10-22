const randomAttack = function (x, y) {
  return Math.floor(Math.random() * (y - x) + x);
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      count: 0,
      playerMoves: [],
      monsterMoves: [],
    };
  },
  methods: {
    surrender() {
      this.playerHealth = 0;
    },
    attackMonster() {
      this.count++;
      const playerDamage = randomAttack(5, 12);
      this.monsterHealth -= playerDamage;
      this.attackPlayer();
      this.playerMoves.unshift({
        Phealth: this.playerHealth,
        Pattack: playerDamage,
      });
    },
    attackPlayer() {
      const monsterDamage = randomAttack(8, 15);
      this.playerHealth -= monsterDamage;
      this.monsterMoves.unshift({
        Mhealth: this.monsterHealth,
        Mattack: monsterDamage,
      });
    },
    speciaAttack() {
      this.count++;
      const specialAttackValue = randomAttack(10, 25);
      this.monsterHealth -= specialAttackValue;
      this.playerMoves.unshift({
        Phealth: this.playerHealth,
        Pattack: `Special Attack`,
      });
      this.attackPlayer();
    },
    heal() {
      this.count++;
      const heal = randomAttack(8, 20);
      if (this.playerHealth + heal > 100) this.playerHealth = 100;
      else this.playerHealth += heal;
      this.playerMoves.unshift({
        Phealth: this.playerHealth,
        Pattack: "You Healed this turn",
      });
      this.attackPlayer();
    },
    restartGame() {
      this.count = 0;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.playerMoves = [];
      this.monsterMoves = [];
    },
  },
  computed: {
    calcPlayerStyle() {
      if (this.playerHealth < 0) return { width: "0%" };
      return { width: this.playerHealth + "%" };
    },
    calcMonsterStyle() {
      if (this.monsterHealth < 0) return { width: "0%" };
      return { width: this.monsterHealth + "%" };
    },
    canUseSpecial() {
      return this.count % 3 === 0 && this.count > 0;
    },
    Winner() {
      if (this.playerHealth <= 0 && this.monsterHealth > 0) {
        return "Monster Wins";
      } else if (this.playerHealth > 0 && this.monsterHealth <= 0) {
        return "Player Wins";
      } else if (this.playerHealth <= 0 && this.monsterHealth <= 0)
        return "Draw";
    },
  },
});
app.mount("#game");
