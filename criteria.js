const criteria = {
	"PHQ-9": [
	 	{min: 0, max: 4, label: "Minimal"},
		{min: 5, max: 9, label: "Mild"},
		{min: 10, max: 14, label: "Moderate"},
		{min: 15, max: 19, label: "Moderately Severe"},
		{min: 20, max: 30, label: "Severe"}
	],
	"GAD-7": [
		{min: 0, max: 4, label: "Minimal"},
		{min: 5, max: 9, label: "Mild"},
		{min: 10, max: 14, label: "Moderate"},
		{min: 15, max: 21, label: "Severe"}
	],
	"SMH-40": [
		{min: 0, max: 30, label: "Healthy"},
		{min: 31, max: 60, label: "Mild"},
		{min: 61, max: 90, label: "Significant"},
		{min: 91, max: 120, label: "High Risk"}
	]
}

const smh40Class = {
	"Mood": "Risiko depresi",
	"Kecemasan": "Distress anxiety",
	"Regulasi Emosi": "Kontrol impuls rendah",
	"Energi dan Tidur": "Perlu evaluasi bipolar spectrum",
	"Distres Persepsi": "Perlu evaluasi lebih lanjut",
	"Gejala Fisik": "Stres terinternalisasi"
}

function determineCriteria(critName, score) {

	const kriteria = criteria[critName]

	for (let k of kriteria) {
		if (score >= k.min && score <= k.max) {
			return k.label
		}
	}

	return "Faulty";
}

function getCriteria(critName) {
	return criteria[critName]
}

function diagnoseScreening(categoryName) {
	return smh40Class[categoryName]
}