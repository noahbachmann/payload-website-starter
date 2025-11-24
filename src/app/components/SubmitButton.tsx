import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function SubmitButton({ loading, text }: { loading: boolean, text:string }) {
	return(
		<button
			className="button"
			type="submit"
			disabled={ loading }>
				{ text }
				<AiOutlineLoading3Quarters className={ `ml-2 animate-spin ${ loading ? 'block' : 'hidden' }` } />
		</button>
	)
}