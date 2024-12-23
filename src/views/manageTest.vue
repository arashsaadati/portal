<template>
	<div class="panel">
		<selectBox selectClass="small" selectName="type" selectLabel="Exam Type" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
		<selectBox selectClass="small" selectName="model" selectLabel="Exam Model" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
		<selectBox selectClass="small" selectName="shift" selectLabel="Exam Shift" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
		<selectBox selectClass="medium" selectName="city" selectLabel="Exam Venue" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
		<inputBox inputClass="tiny" inputType="text" inputName="capacity" inputLabel="Capacity" @ValueBrodcaster="valueListener"/>
		<selectBox selectClass="tiny" selectName="active" selectLabel="Status" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />

		<inputBox inputClass="medium" inputType="date" inputName="date" inputLabel="Test Date"/>
		<inputBox inputClass="medium" inputType="date" inputName="deadline_date" inputLabel="Deadline"/>
		<inputBox inputClass="medium" inputType="date" inputName="opening_date" inputLabel="Opening Date"/>
		<inputBox inputClass="medium" inputType="number" inputName="cost" inputLabel="Test Fee"/>
		<inputBox inputClass="medium" inputType="number" inputName="transfer_cost" inputLabel="Transfer Cost"/>
		
		<selectBox selectClass="small" selectName="is_cancel" selectLabel="Cancel Status" :selectHtml="examTypeOption"  @ValueBrodcaster="valueListener" />
	</div>
</template>

<script>
import inputBox from "../components/inputBox.vue";
import selectBox from "../components/selectBox.vue";
import buttonBox from "../components/buttonBox.vue";

export default {
	components: { inputBox,selectBox,buttonBox },
}
</script>

<style>

</style>