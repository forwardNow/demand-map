<template>
  <div
      :class="[
        'rpa-tooltips',
        `rpa-tooltips_${placement}`,
        `rpa-tooltips_${type}`,
      ]"
      :style="{ left, top }"
  >
    <div class="rpa-tooltips__content" v-html="content" />
    <div class="rpa-tooltips__arrow" />
  </div>
</template>
<script>
import {PLACEMENT} from "./Tooltips.ts";

export default {
  props: {
    content: {
      type: String,
      default: '',
    },
    placement: {
      type: String,
      default: 'top',
    },
    type: {
      type: String,
      default: 'danger',
    },
  },

  mounted() {
    this.$emit('tooltipsComponentMounted');
  },

  data() {
    return {
      top: 0,
      left: 0,
    };
  },

  methods: {
    setPosition(targetRect) {
      this.$nextTick(() => {
        const {left, top, width, height} = targetRect;
        const {width: tooltipsWidth, height: tooltipsHeight} = this.getRect();

        const arrowSize = 10;

        let tooltipsLeft = 0;
        let tooltipsTop = 0;

        if (this.placement === PLACEMENT.TOP) {
          tooltipsLeft = left + width / 2 - tooltipsWidth / 2;
          tooltipsTop = top - tooltipsHeight - arrowSize;
        }

        if (this.placement === PLACEMENT.RIGHT) {
          tooltipsLeft = left + width + arrowSize;
          tooltipsTop = top + height / 2 - tooltipsHeight / 2;
        }

        if (this.placement === PLACEMENT.BOTTOM) {
          tooltipsLeft = left + width / 2 - tooltipsWidth / 2;
          tooltipsTop = top + height + arrowSize;
        }

        if (this.placement === PLACEMENT.LEFT) {
          tooltipsLeft = left -tooltipsWidth - arrowSize;
          tooltipsTop = top + height / 2 - tooltipsHeight / 2;
        }

        this.left = tooltipsLeft + 'px';
        this.top = tooltipsTop + 'px';
      });
    },

    getRect() {
      return this.$el.getBoundingClientRect();
    },
  }
}
</script>
<style lang="scss">
  $tooltips_default__background-color: #303133;
  $tooltips_default__font-color: #fff;
  $tooltips_default__border-color: #303133;

  $tooltips_info__background-color: #e6f7ff;
  $tooltips_info__font-color: rgba(0,0,0,0.65);
  $tooltips_info__border-color: #91d5ff;

  $tooltips_success__background-color: #f6ffed;
  $tooltips_success__font-color: rgba(0,0,0,0.65);
  $tooltips_success__border-color: #b7eb8f;

  $tooltips_warning__background-color: #fffbe6;
  $tooltips_warning__font-color: rgba(0,0,0,0.65);
  $tooltips_warning__border-color: #ffe58f;

  $tooltips_danger__background-color: #fff1f0;
  $tooltips_danger__font-color: rgba(0,0,0,0.65);
  $tooltips_danger__border-color: #ffa39e;

  $tooltips-arrow-size: 5px;

  .rpa-tooltips {
    z-index: 2000;
    position: absolute;
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
    border-radius: 4px;

    border: solid 1px $tooltips_default__border-color;
    background: $tooltips_default__background-color;
    color: $tooltips_default__font-color;

    &,
    * {
      box-sizing: border-box;
    }
  }
  .rpa-tooltips__content {

  }

  .rpa-tooltips__arrow {
    position: absolute;
    border: solid $tooltips-arrow-size transparent;

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: solid $tooltips-arrow-size transparent;
    }
  }

  .rpa-tooltips_top {
    .rpa-tooltips__arrow {
      bottom: -($tooltips-arrow-size * 2);
      left: 50%;
      margin-left: -$tooltips-arrow-size;
      border-top-color: $tooltips_default__border-color;

      &:after {
        top: -($tooltips-arrow-size + 1);
        left: -($tooltips-arrow-size);
        border-top-color: $tooltips_default__background-color;
      }
    }
  }

  .rpa-tooltips_right {
    .rpa-tooltips__arrow {
      left: -($tooltips-arrow-size * 2);
      top: 50%;
      margin-top: -$tooltips-arrow-size;
      border-right-color: $tooltips_default__border-color;

      &:after {
        top: -($tooltips-arrow-size);
        left: -($tooltips-arrow-size - 1);
        border-right-color: $tooltips_default__background-color;
      }
    }
  }

  .rpa-tooltips_bottom {
    .rpa-tooltips__arrow {
      top: -($tooltips-arrow-size * 2);
      left: 50%;
      margin-left: -$tooltips-arrow-size;
      border-bottom-color: $tooltips_default__border-color;

      &:after {
        top: -($tooltips-arrow-size - 1);
        left: -($tooltips-arrow-size);
        border-bottom-color: $tooltips_default__background-color;
      }
    }
  }

  .rpa-tooltips_left {
    .rpa-tooltips__arrow {
      right: -($tooltips-arrow-size * 2);
      top: 50%;
      margin-top: -$tooltips-arrow-size;
      border-left-color: $tooltips_default__border-color;

      &:after {
        top: -($tooltips-arrow-size);
        left: -($tooltips-arrow-size + 1);
        border-left-color: $tooltips_default__background-color;
      }
    }
  }
  
  @mixin rpa-tooltips-type($tooltips_type__font-color, $tooltips_type__background-color, $tooltips_type__border-color) {
    background: $tooltips_type__background-color;
    color: $tooltips_type__font-color;
    border-color: $tooltips_type__border-color;

    &.rpa-tooltips_top {
      .rpa-tooltips__arrow {
        border-top-color: $tooltips_type__border-color;

        &:after {
          border-top-color: $tooltips_type__background-color;
        }
      }
    }

    &.rpa-tooltips_right {
      .rpa-tooltips__arrow {
        border-right-color: $tooltips_type__border-color;

        &:after {
          border-right-color: $tooltips_type__background-color;
        }
      }
    }

    &.rpa-tooltips_bottom {
      .rpa-tooltips__arrow {
        border-bottom-color: $tooltips_type__border-color;

        &:after {
          border-bottom-color: $tooltips_type__background-color;
        }
      }
    }

    &.rpa-tooltips_left {
      .rpa-tooltips__arrow {
        border-left-color: $tooltips_type__border-color;

        &:after {
          border-left-color: $tooltips_type__background-color;
        }
      }
    }
  }

  .rpa-tooltips_info {
    @include rpa-tooltips-type(
        $tooltips_info__font-color,
        $tooltips_info__background-color,
        $tooltips_info__border-color
    )
  }

  .rpa-tooltips_success {
    @include rpa-tooltips-type(
        $tooltips_success__font-color,
        $tooltips_success__background-color,
        $tooltips_success__border-color
    )
  }

  .rpa-tooltips_warning {
    @include rpa-tooltips-type(
        $tooltips_warning__font-color,
        $tooltips_warning__background-color,
        $tooltips_warning__border-color
    )
  }


  .rpa-tooltips_danger {
    @include rpa-tooltips-type(
        $tooltips_danger__font-color,
        $tooltips_danger__background-color,
        $tooltips_danger__border-color
    )
  }

</style>