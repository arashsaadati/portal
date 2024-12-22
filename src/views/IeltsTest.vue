<template>
		<form id="search" @submit.prevent="filterExam">
			Search
			<inputBox inputType="date" inputName="date" inputLabel="From Date" />
			<select v-model="model" @change="examModelChange">
				<option value='' selected="selected">Exam Model</option>
				<option value="cdielts">ielts</option>
				<option value="cdukvi">ukvi</option>
				<option value="life skills">life skills</option>
			</select>
			<select v-model="type" v-html="examTypeOption"></select>
			<button type="submit">Search</button>
		</form>
		<Tables 
			@rowClick="manageExam"
			@tablePaging="pagination" 
			:gridData="this.testList.data" 
			:gridCount="this.testList.count" 
			:gridCol="this.column" 
			gridSize="15% 5% 15% 15% 15% 15% 15% 5%"/>
</template>

<script>
import Tables from "./../components/Table.vue";
import inputBox from "../components/inputBox.vue";
export default {
	components: { Tables,inputBox },
	data() {
		return {
			testList : [],
			column: [ '','id','model','type','shift','city','date','active' ],
			baseGetExamUrl: 'https://aps.irsafam.com/exam',
			GetExamPage : 1,
			examTypeOption: '',
			searchParams: {
				'date>==' : new Date().toJSON().slice(0,10).replace(/-/g,'/'),
				'model': ['cdielts','cdukvi','life skills']
			}
		}
	},
	methods: {
		pagination(page) { 
			this.getExam(this.searchParams, page);
		},
		filterExam() {
			console.log(this.date)
			if (this.date) this.searchParams['date==='] = this.date;
			if (this.model) this.searchParams['model==='] = this.model;
			if (this.type) this.searchParams['type==='] = this.type;

			this.getExam(this.searchParams, 1);
		},
		examModelChange() {
			switch (this.model) {
				case 'life skilld':
					this.examTypeOption = '<option value="" selected="selected">Exam Type</option><option value="a1">A1</option><option value="b1">B1</option>'
				break;
			
				default:
					this.examTypeOption = '<option value="" selected="selected">Exam Type</option><option value="academic">Academic</option><option value="general">General</option>'
				break;
			}
		},
		manageExam(data) {
			this.$router.push('/ielts/'+data.id);
		}
		,
		getExam(filter, page, grid = 25) {
			let getExamURL = new URL(this.baseGetExamUrl);
			for (const key in filter) {
				getExamURL.searchParams.append('filter['+key+']', filter[key]);
			}
			getExamURL.searchParams.append('page', page);
			
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