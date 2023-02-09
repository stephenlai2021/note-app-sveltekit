import supabase from '$lib/supabase/config';

export const load = async () => {
	const { data, error } = await supabase
		.from('note_app')
		.select('*')
		.order('created_at', { ascending: true });
	
	console.log('data: ', data);

	return { notesArray: data };
};

export const actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');

		if (theme) {
			cookies.set('colorTheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}
	}
};
