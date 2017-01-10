class DefaultController {
	getDefault (req, res) {
		res.status(200).json({
			success: true
		});
	}
}

export default DefaultController;