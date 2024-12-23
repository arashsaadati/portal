<template>
		<form id="search" class="searchbox" @submit.prevent="filterExam">
			<inputBox inputClass="small" inputType="date" inputName="date" inputLabel="From Date" @ValueBrodcaster="valueListener"/>
			<inputBox inputClass="small" inputType="date" inputName="dateTo" inputLabel="To Date" @ValueBrodcaster="valueListener"/>
			<selectBox selectClass="small" selectName="model" selectLabel="Exam Model" :selectData="testModelOption" @change="examModelChange" @ValueBrodcaster="valueListener" />
			<selectBox selectClass="small" selectName="type" selectLabel="Exam Type" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
			<buttonBox buttonValue="Filter" buttonClass="btn info" buttonType="submit" />
			<buttonBox buttonValue="Reset" buttonClass="btn clean" @click="resetFilter" />
		</form>
		<Tables 
			@rowClick="manageExam"
			@tablePaging="pagination" 
			:gridData="testList.data" 
			:gridCount="testList.count" 
			:gridCol="column" 
			:gridCurPage="GetExamPage"
			:gridStartRow="gridStartRow"
			:gridRowCount="gridRowCount"
			gridSize="5% 10% 10% 10% 30% 15% 10% 10%"/>
</template>

<script>
import Tables from "./../components/Table.vue";
import inputBox from "../components/inputBox.vue";
import selectBox from "../components/selectBox.vue";
import buttonBox from "../components/buttonBox.vue";

export default {
	components: { Tables,inputBox,selectBox,buttonBox },
	data() {
		return {
			testList : [],
			column: [ 'id','model','type','shift','city','date','capacity','active' ],
			baseGetExamUrl: 'https://aps.irsafam.com/exam',
			GetExamPage : 1,
			gridStartRow : 0,
			gridRowCount : 55,
			examTypeOption: '',
			testModelOption: [
				{value:'', title:'TEST MODEL'},
				{value:'cdielts', title:'IELTS'},
				{value:'cdukvi', title:'UKVI'},
				{value:'life skills', title:'life skills'}
			],
			searchParams: {
				'date>==' : new Date().toJSON().slice(0,10).replace(/-/g,'/'),
				'model': ['cdielts','cdukvi','life skills']
			}
		}
	},
	methods: {
		valueListener(data) {
			this[`${data[1]}`] = data[0];
		},
		pagination(page) { 
			this.getExam(this.searchParams, page);
		},
		filterExam() {
			this.searchParams = [];
			this.GetExamPage = 1;
			this.gridStartRow = 0;

			if (this.date) this.searchParams['date==='] = this.date;
			else if (!this.date) this.searchParams['date>=='] = new Date().toJSON().slice(0,10).replace(/-/g,'/');

			if (this.date && this.dateTo) {
				delete this.searchParams['date==='];
				this.searchParams['date>=='] = this.date;
				this.searchParams['date<=='] = this.dateTo;
			}

			if (this.model) this.searchParams['model==='] = this.model;
			else if (!this.model) this.searchParams['model'] = ['cdielts','cdukvi','life skills'];

			if (this.type) this.searchParams['type==='] = this.type;

			this.getExam(this.searchParams, 1);
		},
		examModelChange() {
			switch (this.model) {
				default:
					this.examTypeOption = '<option value="">Select Type</option>'
				break;
				case 'life skills':
					this.examTypeOption = '<option value="" selected="selected">Exam Type</option><option value="a1">A1</option><option value="b1">B1</option>'
				break;
			
				case 'cdukvi':
				case 'cdielts':
					this.examTypeOption = '<option value="" selected="selected">Exam Type</option><option value="academic">Academic</option><option value="general">General</option>'
				break;
			}
		},
		manageExam(data) {
			this.$router.push('/ielts/'+data.id);
			let getExamURL = new URL(this.baseGetExamUrl);
			fetch(getExamURL.href+'/'+data.id, {
				method : 'GET',
				headers: { 
					'Content-Type': 'application/json',
					'api-key': '3dThEUtmksEuXBsaRHJWq2kFirTbSHgTpKQF77gX3FOat' 
				}
			})
				.then(res => res.json())
				.then((result) => {
					this.testList = result
					this.GetExamPage = page
				})
				.catch((error) => console.error(error));
		},
		resetFilter(data) {
			document.getElementById('search').reset()

			this.searchParams = {
				'date>==' : new Date().toJSON().slice(0,10).replace(/-/g,'/'),
				'model': ['cdielts','cdukvi','life skills']
			}
			this.date = '';
			this.model = '';
			this.type = '';
			this.GetExamPage = 1;
			this.gridStartRow = 0;
			this.getExam(this.searchParams, 1);
		},
		getExam(filter, page, grid = 25) {
			let getExamURL = new URL(this.baseGetExamUrl);
			for (const key in filter) {
				getExamURL.searchParams.append('filter['+key+']', filter[key]);
			}
			getExamURL.searchParams.append('page', page);
			getExamURL.searchParams.append('grid', this.gridRowCount);
			
			fetch(getExamURL.href, {
				method : 'GET',
				headers: { 
					'Content-Type': 'application/json',
					'api-key': '3dThEUtmksEuXBsaRHJWq2kFirTbSHgTpKQF77gX3FOat' 
				}
			})
			.then(res => res.json())
			.then((result) => {
				this.testList = result
				this.GetExamPage = page
			})
			.catch((error) => console.error(error));
		}
		
	},
	async mounted() {
		this.getExam(this.searchParams, this.GetExamPage);
	},
}
</script>

<style>
</style>