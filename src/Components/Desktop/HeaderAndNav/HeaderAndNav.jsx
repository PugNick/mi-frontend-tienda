import useScreenSize from '../../../hooks/UseScreenSize';
import HeaderAndNavDesk from './HeaderAndNavDesk/HeaderAndNavDesk';
import HeaderMobile from '../../Mobile/HeaderMobile/HeaderMobile';

function HeaderAndNav() {
    const width = useScreenSize();

    if (width < 1300) {
        return <HeaderMobile />;
    } else {
        return <HeaderAndNavDesk />;
    }
}

export default HeaderAndNav;