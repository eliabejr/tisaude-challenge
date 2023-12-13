import { mode } from '@chakra-ui/theme-tools';
export const sliderStyles = {
	components: {
		RangeSlider: {
			variants: {
				main: (props: any) => ({
					thumb: {
						bg: mode('purple.700', 'purple.500')(props)
					}
				})
			}
		}
	}
};
