import { defineComponent, ref } from 'vue'
import s from './FoodRecommendationCard.module.scss'
import { useUserStore } from '@/stores/user'

export const FoodRecommendationCard = defineComponent({
  setup() {
    const userStore = useUserStore()

    const getRandomIndex = () => {
      return Math.floor(Math.random() * recommendationArray.length)
    }

    const recommendationArray = ['Shredded Pork with Garlic Sauce', '红烧排骨', '水煮鱼', '小炒肉', '回锅肉', '鱼香肉丝']
    const recommendationIndexRef = ref(getRandomIndex())

    const handleRoll = () => {
      recommendationIndexRef.value = getRandomIndex()
    }

    return () => <div class={s.cardWrapper}>
      <div class={s.cardContent}>
        <div class={[s.paragraph]}>
          Hi, {userStore.user.nickname}! Nice to meet you!
        </div>
        <div class={[s.paragraph, s.recommendationParagraph]}>
          <div class={s.recommendationText}>
            Would you like to try
            <span class={s.recommendation}>
              {recommendationArray[recommendationIndexRef.value]}
            </span>
            as today’s meal?
          </div>
          <img onClick={handleRoll} class={s.roll} src="/refresh.svg"/>
        </div>
      </div>

    </div>
  }
})
