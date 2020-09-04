import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

export default class NotFoundImage extends PureComponent {

    render() {
        const { color, size } = this.props;
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 465 465"
            >
                <rect fill="#f6ddcb" y="64" width="465" height="401" />
                <path
                    fill={color}
                    d="M180,375H284a60,60,0,0,1,60,60v30a0,0,0,0,1,0,0H120a0,0,0,0,1,0,0V435A60,60,0,0,1,180,375Z"
                />
                <rect fill={color} x="64" y="208" width="336" height="96" />
                <rect fill="#011c41" x="224" y="118" width="16" height="53" />
                <circle fill={color} cx="232.5" cy="111.5" r="16.5" />
                <rect fill="#fff" x="96" y="160" width="272" height="216" />
                <path fill="#d54e57" fillRule="evenodd" d="M183,345.5a49.5,49.5,0,0,1,99,0H183Z" />
                <path
                    fill="#011c41"
                    fillRule="evenodd"
                    d="M149.453,210.14l56.407,56.407L194.547,277.86,138.14,221.453Z"
                />
                <path
                    fill="#011c41"
                    fillRule="evenodd"
                    d="M194.63,210.015L138.015,266.63l11.355,11.355,56.615-56.615Z"
                />
                <path
                    fill="#011c41"
                    fillRule="evenodd"
                    d="M269.453,210.14l56.407,56.407L314.547,277.86,258.14,221.453Z"
                />
                <path
                    fill="#011c41"
                    fillRule="evenodd"
                    d="M314.63,210.015L258.015,266.63l11.355,11.355,56.615-56.615Z"
                />
                <rect fill={color} width="465" height="64" />
                <rect fill="#fff" opacity={0.8} x="24" y="24" width="16" height="16" />
                <rect fill="#fff" opacity={0.8} x="56" y="24" width="16" height="16" />
                <rect fill="#fff" opacity={0.8} x="88" y="24" width="16" height="16" />
                <rect fill="#fff" opacity={0.8} x="198" y="24" width="242" height="16" />
            </svg>
        );
    }

}

NotFoundImage.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
};
