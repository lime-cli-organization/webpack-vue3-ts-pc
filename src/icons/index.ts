
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
	return	requireContext.keys().map(requireContext)
}
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
