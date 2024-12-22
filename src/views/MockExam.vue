<template>
		<Tables 
        @tablePaging="pagination" 
        :gridData="this.testList.data" 
        :gridCount="this.testList.count" 
        :gridCol="this.column" 
        gridSize="15% 5% 15% 15% 15% 15% 15% 5%"/>
</template>

<script>
import Tables from "./../components/Table.vue";
export default {
	components: { Tables },
	data() {
		return {
			testList : [],
			column: [ '','id','model','type','shift','city','date','active' ],
			baseGetExamUrl: 'https://aps.irsafam.com/exam',
			GetExamPage : 1
		}
	},
	methods: {
		
		pagination(page) { 
			this.getExam({
				'date>==' : '2024-12-01',
				'model': ['cdmock','mock']
			}, page);
		},
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
		this.getExam({
			'date>==' : '2024-12-01',
			'model': ['cdmock','mock']
		}, this.GetExamPage);
	},
	updated() {
		console.log(1)
	}
}
</script>

<style>

</style>