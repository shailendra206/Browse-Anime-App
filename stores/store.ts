import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookmarkArr {
    arr: number[]
    setArr: (id: number) => void
}

export const useBookmarkStore = create<BookmarkArr>()(
    persist(
        (set) => ({
            arr: [],
            setArr: (id) => {
                set(state => ({ arr: state.arr.includes(id) ? state.arr.filter(item => item !== id) : [...state.arr, id] }))
            }
        }), { name: 'bookmarks' }
    )
)
interface ThemeStore {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => {
                set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }))
            }
        }), { name: 'theme' }
    )
)