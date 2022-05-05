import { useState, useEffect } from 'react'
import { supabase } from '../../utils/supabaseClient'
import Avatar from './Avatar'

// #TODO point to right table would be a good start
// #TODO add 
export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('Player')
        .select(`name, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setName(data.name)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  
  async function updateProfile({ name, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        name,
        avatar_url,
      }

      let { error } = await supabase.from('Player').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        /**deleteOldAvatar(avatar_url)**/
        setAvatarUrl(url)
        updateProfile({ name, avatar_url: url })
      }}
    />
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({ name, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
