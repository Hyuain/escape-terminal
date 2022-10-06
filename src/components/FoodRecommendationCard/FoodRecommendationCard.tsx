import { defineComponent, ref } from 'vue'
import s from './FoodRecommendationCard.module.scss'

export const FoodRecommendationCard = defineComponent({
  setup() {
    const getRandomIndex = () => {
      return Math.floor(Math.random() * recommendationArray.length)
    }

    const recommendationArray = ['番茄牛腩', '红烧排骨', '水煮鱼', '小炒肉', '回锅肉', '鱼香肉丝']
    const recommendationIndexRef = ref(getRandomIndex())

    const handleRoll = () => {
      recommendationIndexRef.value = getRandomIndex()
    }

    return () => <div class={s.cardWrapper}>
      <div class={s.description}>午饭时间到啦，今天推荐：</div>
      <div class={s.recommendation}>
        {recommendationArray[recommendationIndexRef.value]}
        <div onClick={handleRoll} class={s.roll}>Roll</div>
      </div>
    </div>
  }
})
