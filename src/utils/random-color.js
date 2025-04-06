export const randomColor = () => {
        const colors = [
            'bg-blue-200 text-blue-500',
            'bg-red-200 text-red-500',
            'bg-green-200 text-green-500',
            'bg-yellow-200 text-yellow-500',
            'bg-indigo-200 text-indigo-500',
            'bg-purple-200 text-purple-500',
            'bg-pink-200 text-pink-500',
            'bg-gray-200 text-gray-500'
        ]

        return colors[Math.floor(Math.random() * colors.length)]
    }