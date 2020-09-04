import { connectScreenSize as connect } from 'react-screen-size';

export const mapScreenSizeToProps = ({
    sm, md,
    xs, gtMd,
    lg, gtLg,
    xl, xxl,
}) => ({
    isTablet: sm || md,
    isMobile: xs,
    isDesktop: gtMd,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    gtLg,
});

export const connectScreenSize = Component => {
    return connect(mapScreenSizeToProps)(Component);
};

export const Medias = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 991px)',
    lg: '(min-width: 992px) and (max-width: 1199px)',
    xl: '(min-width: 1200px) and (max-width: 1599px)',
    xxl: '(min-width: 1600px) and (max-width: 9999px)',
    gtXs: '(min-width: 576px)',
    gtSm: '(min-width: 768px)',
    gtMd: '(min-width: 992px)',
    gtLg: '(min-width: 1200px)',
};