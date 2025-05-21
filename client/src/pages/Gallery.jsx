import PostCard from '../components/Gallery/PostCard'

export default function ColorGallery() {

    return (
        <div className="bg-slate-950 h-screen p-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-8">Galerija</h1>
            <div className="grid grid-cols-4 gap-8">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    );
}
