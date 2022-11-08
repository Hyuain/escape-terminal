import { defineComponent, ref } from 'vue'
import s from './FoodRecommendationCard.module.scss'

export const FoodRecommendationCard = defineComponent({
  setup() {
    const getRandomIndex = () => {
      return Math.floor(Math.random() * recommendationArray.length)
    }

    const recommendationArray = ['shredded pork with garlic sauce', '红烧排骨', '水煮鱼', '小炒肉', '回锅肉', '鱼香肉丝']
    const recommendationIndexRef = ref(getRandomIndex())

    const handleRoll = () => {
      recommendationIndexRef.value = getRandomIndex()
    }

    return () => <div class={s.cardWrapper}>
      <div class={s.cardContent}>
        <div class={[s.paragraph]}>
          hi, nice to meet you!
        </div>
        <div class={[s.paragraph]}>
          <div>would you like to try</div>
          <div class={s.recommendation}>
            {recommendationArray[recommendationIndexRef.value]}
          </div>
          <div>as today’s meal?</div>
          <img onClick={handleRoll} class={s.roll} src="/refresh.svg"/>
        </div>
      </div>

    </div>
  }
})
