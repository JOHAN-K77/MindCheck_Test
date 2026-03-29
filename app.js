let currentTest = ""
let index = 0
let score = 0
let chartInstance = null
let screeningConcern = []
let screeningRes = {}

const testQuestions = {

"Depression Test":[
"I feel sad or empty most of the day",
"I have lost interest in activities I used to enjoy",
"I feel tired or have little energy",
"I have trouble sleeping or sleep too much",
"I feel bad about myself or feel like a failure",
"I have trouble concentrating on things",
"I move or speak slower than usual",
"I feel hopeless about the future",
"I have little motivation to do daily tasks",
"I feel emotionally numb"
],

"Anxiety Test":[
"Over the last 2 weeks, I feel nervous or anxious without clear reason",
"Over the last 2 weeks, I find it difficult to control my anxiety",
"Over the last 2 weeks, I worry too much about different things",
"Over the last 2 weeks, I have trouble relaxing",
"Over the last 2 weeks, I feel restless I'm unable to sit still",
"Over the last 2 weeks, I become easily irritated",
"Over the last 2 weeks, I feel afraid something awful might happen"
],

"Stress Test":[
"I feel overwhelmed by responsibilities",
"I feel under constant pressure",
"I have difficulty relaxing after work",
"I feel mentally exhausted",
"I feel impatient or frustrated easily",
"I feel tension in my body",
"I feel I have too many things to do",
"I feel stressed about deadlines",
"I have difficulty sleeping due to stress",
"I feel emotionally drained"
],

"Burnout Test":[
"I feel emotionally drained from my work",
"I feel tired when I think about work",
"I feel less motivated to work",
"I feel detached from my job",
"I feel my work is no longer meaningful",
"I feel exhausted at the end of the day",
"I feel cynical about my work",
"I feel less productive than before",
"I feel overwhelmed by my workload",
"I feel like I cannot recover my energy"
],

"Trauma Test":[
"I have upsetting memories about a past event",
"I avoid reminders of a stressful event",
"I feel emotionally numb",
"I feel constantly alert or on guard",
"I have nightmares related to past experiences",
"I feel jumpy or easily startled",
"I feel detached from people around me",
"I have difficulty trusting others",
"I feel strong emotional reactions to reminders",
"I have trouble sleeping because of memories"
],

"Personality Test":[
"I enjoy meeting new people",
"I like trying new experiences",
"I prefer planning instead of acting spontaneously",
"I enjoy helping other people",
"I stay calm in stressful situations",
"I enjoy working in teams",
"I like organizing things carefully",
"I enjoy creative activities",
"I prefer quiet environments",
"I feel comfortable expressing my opinions"
]

}

const screeningQuestions = [
	{ kategori: "Mood", pertanyaan: "Saya sering merasa tidak bersemangat menjalani aktivitas sehari-hari", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya merasa sedih tanpa alasan yang jelas", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya merasa bersalah atas hal-hal kecil", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya merasa hidup saya kurang berarti", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya sulit menikmati hal-hal yang biasanya menyenangkan", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya merasa putus asa terhadap masa depan", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya merasa kepercayaan diri saya menurun", balik: false },
	{ kategori: "Mood", pertanyaan: "Saya tetap merasa optimis terhadap masa depan", balik: true},
	{ kategori: "Kecemasan", pertanyaan: "Saya sering merasa cemas atau khawatir berlebihan", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saya merasa tegang meskipun tidak ada masalah besar", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saya mudah terkejut atau merasa waspada berlebihan", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saya merasa sesuatu yang buruk akan segera terjadi", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saat tertekan, tubuh saya menjadi tidak nyaman (misalnya sakit kepala atau jantung berdebar)", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saya sulit mengendalikan rasa khawatir saya", balik: false },
	{ kategori: "Kecemasan", pertanyaan: "Saya merasa tenang dalam menghadapi masalah", balik: true},
	{ kategori: "Regulasi Emosi", pertanyaan: "Saya mudah tersinggung oleh hal-hal kecil", balik: false },
	{ kategori: "Regulasi Emosi", pertanyaan: "Saya merasa marah lebih kuat dari yang seharusnya", balik: false },
	{ kategori: "Regulasi Emosi", pertanyaan: "Saat marah, saya kesulitan mengendalikan diri", balik: false },
	{ kategori: "Regulasi Emosi", pertanyaan: "Saya menyesal setelah meluapkan emosi", balik: false },
	{ kategori: "Regulasi Emosi", pertanyaan: "Saya mampu mengendalikan emosi saya dengan baik", balik: true },
	{ kategori: "Regulasi Emosi", pertanyaan: "Saya kadang bereaksi berlebihan terhadap masalah", balik: false },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya merasa nyaman berinteraksi dengan orang lain", balik: true },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya menghindari pertemuan sosial tanpa alasan jelas", balik: false },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya merasa sulit mendapatkan teman baru", balik: false },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya merasa orang lain tidak memahami saya", balik: false },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya merasa diterima dalam lingkungan saya", balik: true },
	{ kategori: "Fungsi Sosial", pertanyaan: "Saya lebih memilih menyendiri dibandingkan bersama orang lain", balik: false },
	{ kategori: "Energi dan Tidur", pertanyaan: "Pola tidur saya terganggu (sulit tidur atau sering terbangun)", balik: false },
	{ kategori: "Energi dan Tidur", pertanyaan: "Saya merasa kelelahan meskipun sudah cukup istirahat", balik: false },
	{ kategori: "Energi dan Tidur", pertanyaan: "Ada saat saya merasa sangat berenergi tanpa sebab jelas", balik: false },
	{ kategori: "Energi dan Tidur", pertanyaan: "Saya sulit menghentikan aktivitas meskipun tubuh sudah lelah", balik: false },
	{ kategori: "Energi dan Tidur", pertanyaan: "Energi saya stabil sepanjang hari", balik: false },
	{ kategori: "Distres Persepsi", pertanyaan: "Saya merasa orang lain membicarakan saya tanpa alasan jelas", balik: false },
	{ kategori: "Distres Persepsi", pertanyaan: "Saya merasa diperhatikan atau diamati secara berlebihan", balik: false },
	{ kategori: "Distres Persepsi", pertanyaan: "Kadang saya merasa lingkungan sekitar terasa tidak nyata", balik: false },
	{ kategori: "Distres Persepsi", pertanyaan: "Pikiran saya terasa kacau atau sulit dikendalikan", balik: false },
	{ kategori: "Gejala Fisik", pertanyaan: "Saya sering mengalami sakit kepala atau tegang pada tubuh saat stres", balik: false },
	{ kategori: "Gejala Fisik", pertanyaan: "Saya merasa jantung berdebar saat menghadapi tekanan", balik: false },
	{ kategori: "Gejala Fisik", pertanyaan: "Saya mengalami gangguan pencernaan saat sedang tertekan", balik: false },
	{ kategori: "Gejala Fisik", pertanyaan: "Tubuh saya tetap terasa nyaman meskipun sedang menghadapi masalah", balik: true }
]

const usedCriteria = {
	"Depression Test": {crit: "PHQ-9"},
	"Anxiety Test": {crit: "GAD-7"},
	"Screening": {crit: "SMH-40"}
}


function showPage(id) {

	document.querySelectorAll("section").forEach(s => s.style.display="none")

	document.getElementById(id).style.display="block"
}

function startAssessment() {

	showPage("menu")
}

function goHome(){

	showPage("home")
}

function showPage(page) {

	document.querySelectorAll("section").forEach(s => s.style.display = "none")

	document.getElementById(page).style.display = "block"

	if (page === "home") {
		document.getElementById("homeBtn").style.display = "none"
	} else {
		document.getElementById("homeBtn").style.display = "inline-block"
	}
}


function chooseTest(name) {

	currentTest = name
	showPage("user")
}

function startTest() {

	let name = document.getElementById("name").value
	let age = document.getElementById("age").value
	let gender = document.getElementById("gender").value

	if (name == "" || age == "" || gender == "") {

		alert("Please fill Name, Age and Gender")

		return
	}

	index = 0
	score = 0
	screeningConcern = []
	screeningRes = {}

	showPage("test")

	document.getElementById("testTitle").innerText = currentTest == "Screening" ? currentTest + " Mental Health" : currentTest

	if (currentTest == "Screening") {
		for (let s of screeningQuestions) {
			if (!screeningRes[s.kategori]) {
				screeningRes[s.kategori] = {total: 0, input: 0}
			}

			screeningRes[s.kategori].total++
		}
	}

	loadQuestion()
}

function loadQuestion() {

	document.getElementById("questionCount").innerText = `Question ${index + 1} of ${currentTest !== "Screening" ? testQuestions[currentTest].length : screeningQuestions.length}`

	if (currentTest !== "Screening") {
		document.getElementById("questionText").innerText = testQuestions[currentTest][index]
	} else {
		document.getElementById("questionText").innerText = "Dalam 1 bulan terakhir, " + screeningQuestions[index].pertanyaan
	}

	let options = {
		other: ["Never","Several Days","More Than Half the Days","Nearly Every Day"],
		screening: ["Tidak Pernah", "Jarang", "Sering", "Hampir Selalu"]
	}

	let html = ""

	if (currentTest !== "Screening") {
		options.other.forEach((o,i) => {
	
			html += `<label>
			<input type="radio" name="answer" value="${i}">
			${o}
			</label><br>`
		})
	} else {
		options.screening.forEach((o,i) => {
	
			html += `<label>
			<input type="radio" name="answer" value="${screeningQuestions[index].balik ? 3-i : i}">
			${o}
			</label><br>`
		})
	}

	document.getElementById("answers").innerHTML = html
}

function nextQuestion() {

	let selected = document.querySelector("input[name=answer]:checked")

	if (!selected) {
		alert("Please select an answer")

		return
	}

	score += parseInt(selected.value)

	if (currentTest == "Screening") {

		const kat = screeningQuestions[index].kategori
		
		screeningRes[kat].input += parseInt(selected.value)
	}

	index++

	if (currentTest !== "Screening") {
		if (index >= testQuestions[currentTest].length) {
			showResult()
			return
		}
	} else {
		if (index >= screeningQuestions.length) {
			showResult()
			return
		}
	}

	loadQuestion()
}

function prevQuestion() {

	if (index > 0) {
		let selected = document.querySelector("input[name=answer]:checked")

		if (!selected) {
			alert("Please select an answer")

			return
		}

		score -= parseInt(selected.value)

		index --

		loadQuestion()
	}
}

function showResult() {

	showPage("result")

	const criteria = usedCriteria[currentTest].crit

	let category = determineCriteria(criteria, score)

	const measurement = getCriteria(criteria)
	
	const maxValue = Math.max(...measurement.map(m => m.max))

	document.getElementById("resultTitle").innerText="Assessment Result : "+currentTest

	document.getElementById("scoreText").innerText="Score: "+score+" ("+category+")"

	if (chartInstance) {

		chartInstance.destroy()
	}

	const chartConfig = {
		type:"doughnut",

		data: currentTest !== "Screening" ? {
			labels:["Score","Remaining"],
			datasets:[{data:[score,maxValue-score]}]
		} : {
			labels: [...Object.keys(screeningRes), "Remaining"],
			datasets: [{
				data: [...Object.values(screeningRes).map(s => s.input), maxValue-score],
				backgroundColor: [...Object.keys(screeningRes).map((_, i) =>
					`hsl(${i * 50}, 70%, 60%)`), "#E0E0E0"],
		        borderWidth: 0
			}]
		}
	}

	if (currentTest == "Screening") {
		chartConfig.options = {
		    cutout: "70%"
		}
	}

	chartInstance = new Chart(document.getElementById("chart"), chartConfig)

	let html = `<h4>${criteria} ${currentTest} Scale</h4>`

	html += "<table>"
	
	measurement.forEach(u => {
		html += "<tr>"
		html += `<td>${u.min}-${u.max}</td><td>${u.label}</td>`
		html += "</tr>"
	})

	html += "</table>"

	if (currentTest == "Screening") {
		for (let [c, s] of Object.entries(screeningRes)) {
			if (s.input >= (3 * s.total * 3) / 4 && c != "Fungsi Sosial") {
				html += `<p>${c} -> ${diagnoseScreening(c)}</p>`
				
				screeningConcern.push({category: c, verdict: diagnoseScreening(c)})
			}
		}
	}

	html += "<br><p>Untuk konsultasi lebih lanjut, silakan hubungi:</p><ul><li>Ani - Bali Pelita Jiwa (+62 821-4417-6880)</li><li>Wing Amerta RSUP Ngoerah (d/h Sanglah) (+62 851-0640-5474)</li><li>RS Kasih Ibu Denpasar (+62 811-3831-5013)</li></ul>"

	document.getElementById("testResult").innerHTML = ""
	document.getElementById("testResult").innerHTML = html
}

function backMenu() {

	if (confirm("Are you sure you want to leave this page?")) {

		showPage("menu")
	}
}

function toggleDark() {

	document.body.classList.toggle("dark")
}

function downloadPDF() {

	const criteria = usedCriteria[currentTest].crit
	const measurement = getCriteria(criteria)

	let html = ""
	let idx = 1
	for (let m of measurement) {
		html += `${m.min}-${m.max} ${m.label}`

		if (idx < measurement.length) {
			html += " | "
			idx ++
		}
	}

	const {jsPDF}=window.jspdf

	let doc=new jsPDF()

	let name=document.getElementById("name").value
	let age=document.getElementById("age").value
	let gender=document.getElementById("gender").value

	doc.setFontSize(24)
	doc.text("MindCheck",20,20)

	doc.setFontSize(14)
	doc.text("Mental Health Report",20,30)

	doc.setFillColor(10,44,205)
	doc.rect(20,35,170,3,"F")

	doc.setFontSize(12)

	doc.text("Name: "+name,20,50)
	doc.text("Age: "+age,20,60)
	doc.text("Gender: "+gender,20,70)

	doc.setTextColor(0,0,200)
	doc.text(currentTest == "Screening" ? currentTest + " Mental Health" : currentTest,20,90)

	doc.setTextColor(0,0,0)
	doc.text("Score: "+score,20,100)

	doc.text(`${criteria} Reference:`,20,120)
	doc.text(html,20,130)

	if (screeningConcern.length > 0) {
		doc.text("Untuk diperhatikan:",20,150)
		
		let vertRow = 160
		for (let c of screeningConcern) {
			doc.text(`${c.category} -> ${c.verdict}`,20,vertRow)
			vertRow += 5
		}
	}

	doc.text("This screening test is not a medical diagnosis and should not replace professional consultation.",20,230)

	let date=new Date().toDateString()

	doc.text(date,150,280)

	doc.save("MindCheck_Report.pdf")
}


showPage("home")
