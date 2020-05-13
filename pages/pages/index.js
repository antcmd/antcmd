import { useRouter } from 'next/router'
import { useEscapeToClose } from 'hooks'
import Pages from 'components/Pages'

export default () => {
  const { push } = useRouter()
  useEscapeToClose(() => push('/'))

  return <Pages />
}
