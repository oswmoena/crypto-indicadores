import { response } from './Client'

export const getIndicators = () => {
	const options = {
		url: ``,
	}
	return response(options)
}

export const getIndicatorByCode = (code) => {
	const options = {
		url: `/${code}`,
	}
	return response(options)
}