import Alert from './Main/Alert'
import SectionOne from './Main/SectionOne'
import SectionTwo from './Main/SectionTwo'
import SectionThree from './Main/SectionThree'
import SectionFour from './Main/SectionFour'
import SectionFive from './Main/SectionFive'
import SectionSix from './Main/SectionSix'
import YoutubeVideos from '../YoutubeVideos/YoutubeVideos'

export default function Home() {
  return (
    <div>
      <Alert />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        {/* <YoutubeVideos /> */}
    </div>
  )
}
