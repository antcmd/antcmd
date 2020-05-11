import Header from './Header'
import Sidebar from './Sidebar'

export default ({ children }) => (
  <>
    <Header />
    <Sidebar />
    {children}
  </>
)
