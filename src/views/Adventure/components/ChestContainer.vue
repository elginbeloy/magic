<template>
  <div class="chest-container">
    <a class="banner">{{ chest.name }}</a>
    <template v-if="picking">
      <div class="task-selector" v-if="!selectedTaskType">
        <div class="task-selector__option" @click="selectTaskType('generic')">
          <img src="../../../assets/images/fight.png" />
          Task
        </div>
        <div class="task-selector__option" @click="selectTaskType('coding')">
          <img src="../../../assets/images/fight.png" />
          Coding
        </div>
        <div class="task-selector__option" @click="selectTaskType('meta')">
          <img src="../../../assets/images/fight.png" />
          Meta
        </div>
      </div>
      <div
        class="task-container"
        v-else-if="selectedTaskType == 'generic'"
      ></div>
      <div
        class="editor-container"
        v-else-if="selectedTaskType == 'coding' || selectedTaskType == 'meta'"
      >
        <AceEditor
          v-model="content"
          @init="editorInit"
          lang="html"
          width="100%"
          height="100%"
        ></AceEditor>
      </div>

      <div class="picking-progress">
        <div
          class="picking-progress__progress-bar"
          :style="{
            width:
              ((pickingProgressSeconds % chest.timeLengthSeconds) /
                chest.timeLengthSeconds) *
                100 +
              '%'
          }"
        ></div>
        <a class="picking-progress__text">
          {{ pickingProgressSeconds }} / {{ chest.timeLengthSeconds }}
        </a>
      </div>
      <div class="pick-button" @click="finish" v-if="completedPicking">
        <img src="../../../assets/images/fight.png" /> Finish Picking Lock
      </div>
    </template>
    <template v-else>
      <img class="chest" :src="chest.imagePath" />
      <div class="pick-button" @click="startPicking">
        <img src="../../../assets/images/fight.png" /> Pick Lock
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Chest } from "@/Chest";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import AceEditor from "vue2-ace-editor";

type TASK_TYPE = "generic" | "coding" | "meta";

@Component({
  computed: mapState(["user", "chest"]),
  components: {
    AceEditor
  }
})
export default class AlertContainer extends Vue {
  chest!: Chest;
  picking = false;
  completedPicking = false;
  selectedTaskType: TASK_TYPE | null = null;
  pickingProgressSeconds = 0;
  model = "";
  updateInterval: number | null = null;

  editorInit() {
    require("brace/ext/language_tools"); //language extension prerequsite...
    require("brace/mode/html");
    require("brace/mode/javascript"); //language
    require("brace/snippets/javascript"); //snippet
  }

  startPicking() {
    this.picking = true;
  }

  finish() {
    this.$store.commit(
      "pickChest",
      this.pickingProgressSeconds / this.chest.timeLengthSeconds
    );
    if (this.updateInterval) clearInterval(this.updateInterval);
  }

  selectTaskType(taskType: TASK_TYPE) {
    this.selectedTaskType = taskType;
    this.updateInterval = setInterval(() => {
      console.log(this.pickingProgressSeconds);
      this.pickingProgressSeconds += 1;
      if (this.pickingProgressSeconds >= this.chest.timeLengthSeconds) {
        this.completedPicking = true;
      }
    }, 50);
  }
}
</script>

<style scoped lang="scss">
@import "../../../styles.scss";

.chest-container {
  position: relative;
  width: 800px;
  color: #fff;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner {
  position: relative;
  width: 100%;
  height: 80px;

  font-size: 28px;
  line-height: 72px;
  letter-spacing: 8px;
  text-align: center;
  filter: drop-shadow(0 0 8px #000000);
}

.chest {
  position: relative;
  width: 300px;
  filter: drop-shadow(0 0 16px $primary-blue);
}

.pick-button {
  position: relative;
  margin-top: 20px;

  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 6px;
  transition: 0.2s linear all;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    position: relative;
    width: 32px;
    height: 32px;
    margin-right: 32px;
  }

  &:hover {
    filter: drop-shadow(0px 0px 8px $primary-blue);
  }
}

.picking-progress {
  @include progress-bar();
}

.editor-container {
  margin-bottom: 40px;
  width: 100%;
  height: 400px;
}

.task-selector {
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__option {
    position: relative;
    width: 100px;
    height: 100px;
    padding: 10px;
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0 0 4px 1px $primary-blue;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 80%;
      height: auto;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 16px 4px $primary-blue;
    }
  }
}
</style>
