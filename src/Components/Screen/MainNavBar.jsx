import NavDesk from '../Desktop/MainNavBarDesk/MainNavBarDesk'
import NavMobile from '../Mobile/MainNavMobile/MainNavMobile';
import useScreenSize from '../../hooks/UseScreenSize';

function MainNavBar() {
    const width = useScreenSize();

    if (width < 1300) {
        return <NavMobile />;
    } else {
        return <NavDesk />;
    }
}

export default MainNavBar