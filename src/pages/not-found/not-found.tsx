import notFound from '../../common/imgs/404.png'
import s from './not-found.module.scss'

export const NotFound = () => {
  return (
    <div className={s.notFound}>
        <img src={notFound} alt={'not found'}/>
    </div>
  )
}
