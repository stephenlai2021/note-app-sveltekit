import { writable } from 'svelte/store';
import supabase from '$lib/supabase/config'

export const notes = writable([]);
export const tempNote = writable({});
export const darkMode = writable(false);
export const showAddNewNoteModal = writable(false)
export const showUpdateNoteModal = writable(false)
export const isShowMenu = writable(false)

export const fetchNotes = async () => {}
export const addNote = async (note) => {};
export const updateNote = async (note) => {};
export const deleteNote = async (note) => {};


