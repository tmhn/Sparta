function calculateInterest(deposit , years, rate) {

	// begin interest calculation
	// convert rate to a decimal
	var decimalRate = 1 + (rate / 100);

	// calculate the interest multiplier
	var interestMultiplier = Math.pow( decimalRate , years );
	
	// calculate the final amounts
	var total = deposit * interestMultipler;
	var interest = total - deposit;
	
	return {
	
		"total": total,
		"interest": interest
	
	}


}

module.exports = {
	"calculateInterest" : calculateInterest
}