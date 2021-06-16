import { Button } from '@material-ui/core'
import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

var count = 0
export default function AddItem() {

  const { addItem } = useAuth();

  async function foo() {
    var heading = 'Bottle Painting'
    var details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in leo vel metus sollicitudin sagittis.'
    var url = 'https://firebasestorage.googleapis.com/v0/b/decor-it.appspot.com/o/items%2Fimg%2F9.jpeg?alt=media&token=37230080-ee43-420b-ba23-69e51b361590'
    var price = 499
    var uid = '9'
    await addItem(uid, details, price, heading, url)
    console.log('done')
  }

  return (
    <div>
      <Button onClick={foo}>
        add
      </Button>
    </div>
  )
}
